'use strict';

let promise;
let dbConnections;
class CommonInteractor {
  constructor(commonSettings,dbsettings) {
    promise = commonSettings.getPromise();
    dbConnections = dbsettings;
  }

  
  find (dbDialact,tblName,colName,whereQuery,whereValues) {
  	if(!whereValues) {
  		whereValues = [];
  	}
    let aWhereCnt = 0;
     if(!whereQuery) {
      whereQuery = "where 1 = 1";
     } else {
      aWhereCnt = ((whereQuery.match(/,/g) || []).length) + ((whereQuery.match(/=/g) || []).length) + ((whereQuery.match(/<>/g) || []).length) + ((whereQuery.match(/>/g) || []).length) + ((whereQuery.match(/</g) || []).length) + ((whereQuery.match(/>=/g) || []).length) + ((whereQuery.match(/<=/g) || []).length) + ((whereQuery.match(/ BETWEEN /ig) || []).length); 
      if((whereQuery.match(/ between /ig) || []).length) {
        aWhereCnt++;
      }
      let limitNo = (whereQuery.match(/limit/ig) || []).length; 
      let offsetNo = (whereQuery.match(/OFFSET/ig) || []).length;

      if(limitNo  && offsetNo) {
        aWhereCnt += 2;
      } else if(limitNo) {
        aWhereCnt ++;
      }

      if((whereQuery.match(/ in /ig) || []).length) {
        let inLength = (whereQuery.match(/ in /ig) || []).length;
        let inInsertion = whereQuery.match(/\((.*?)\)/g);
        if(inInsertion.length != inLength) {
          throw new Error("invalid query passed");
        }
        for(let i = 0; i < inLength; i++) {
          aWhereCnt = inInsertion[i].split(',').length + 1;
        }
      }
       let aInsertion = 0;
       for(let j = 0; j < whereQuery.length; j++) {
        if(whereQuery[j] == '?' || whereQuery[j] == '$') {
          aInsertion++;
        }
       }
      if(whereValues.length != aWhereCnt || whereValues.length != aInsertion) {
        throw new Error("invalid query Params passed");
      }
    }
    console.log("select "+colName.join(',')+" from "+tblName+" "+whereQuery,whereValues);
    if(dbConnections.getDBServer(dbDialact) == 'mssql') {
		  return promise.using(dbConnections.getDBConnection(dbDialact),function(tx) {
	      return tx.queryAsync("select "+colName.join(',')+" from "+tblName+" "+whereQuery).then(function(rows) {
	         return rows;
	      });
	    });
    } else {
	    return promise.using(dbConnections.getDBConnection(dbDialact),function(tx) {
	      return tx.queryAsync("select "+colName.join(',')+" from "+tblName+" "+whereQuery,whereValues).then(function(rows) {
	      	console.log(rows);
	        if(rows[0] && rows[0].rows) {
	          return rows[0].rows;
	        } else if(rows) {
	          return rows;
	        }
	      });
	    });
	  }
  }

  save(dbDialact,tblName,colNames,values) {
    let cols = '';
    if(colNames.length != values.length) {
      throw new Error("invalid query Params passed");
    }

    if(Array.isArray(values)) {
      if(dbConnections.getDBServer(dbDialact) == 'postgres') {
        for(let i = 0; i < values.length-1; i++) {
          cols += '$'+(i+1)+',';
        }
        cols += '$' + values.length;
      } else if(dbConnections.getDBServer(dbDialact) == 'mysql') {
         for(let i = 0; i < values.length-1; i++) {
          cols += '?,';
         }
         cols += '?';
      }
      
    }
    console.log('insert into '+ tblName+' ('+colNames.join(',')+') values ('+cols+')',values);
    return promise.using(dbConnections.getDBConnection(dbDialact),function(tx) {
      return tx.queryAsync('insert into '+ tblName+' ('+colNames.join(',')+') values ('+cols+')',values).then(function(rows) {
       return {rows};
      }).catch(function (err) {
        console.log(err);
        return {err};
      });
    });
  }

   saveOnUnique(dbDialact,tblName,colNames,values,updateCols,updateValues) {
    let cols = '';
    let updatedCols = '';
    /*if(colNames.length != values.length) {
      throw new Error("invalid query Params passed");
    }*/
    /*if(updateCols.length != updateValues.length) {
      throw new Error("invalid query Params passed");
    }*/

    if(Array.isArray(values) && Array.isArray(updateCols)) {
      if(dbConnections.getDBServer(dbDialact) == 'mysql') {
        let updateBatches = (values.length/colNames.length);
        console.log(updateBatches);
        for(let j = 0; j < updateBatches; j++) {
          cols += '(';
          for(let i = 0; i < colNames.length-1; i++) {
            cols += '?,';
          }
          if(updateBatches != j+1) {
            cols += '?),';
          }
        }
        cols += '?)';
        for(let i = 0; i < updateCols.length-1; i++) {
          updatedCols += updateCols[i]+'=VALUES('+updateCols[i]+'),';
        }
        updatedCols += updateCols[updateCols.length-1]+'=VALUES('+updateCols[updateCols.length-1]+'), id = LAST_INSERT_ID( id );';  
      }
    } else {
      throw new Error("invalid query Params passed");
    }
    console.log('insert into '+ tblName+' ('+colNames.join(',')+') values '+cols+' ON DUPLICATE KEY UPDATE '+updatedCols,values);
    return promise.using(dbConnections.getDBConnection(dbDialact),function(tx) {
      return tx.queryAsync('insert into '+ tblName+' ('+colNames.join(',')+') values '+cols+' ON DUPLICATE KEY UPDATE '+updatedCols,values).then(function(rows) {
       return {rows};
      }).catch(function (err) {
        console.log(err);
        return {err};
      });
    });
  }


  callSP(dbDialact,spName,aInputValues,setQueries) {
    if(dbConnections.getDBServer(dbDialact) == 'mysql') {
      let inputs = '';
      let selectValues = '';
      let paramsDB = [];

      if(!setQueries) {
        setQueries = '';
      } else {
        setQueries += ';';
      }
      if(!Array.isArray(aInputValues)) {
        aInputValues = []; 
      }
      for(let i=0; i < aInputValues.length-1; i++) {
        if(aInputValues[i].indexOf('@') === 0) {
          selectValues += aInputValues[i]+',';
          inputs += aInputValues[i]+',';
        } else {
          inputs += '?,';
          paramsDB.push(aInputValues[i]);
        }
      }
      if(aInputValues[aInputValues.length-1] && aInputValues[aInputValues.length-1].indexOf('@') === 0){
        inputs += aInputValues[aInputValues.length-1];
        selectValues += aInputValues[aInputValues.length-1];
      } else if(aInputValues[aInputValues.length-1] && aInputValues[aInputValues.length-1].indexOf('@') !== 0){
        inputs += '?';
        paramsDB.push(aInputValues[aInputValues.length-1]);
      }
      if(selectValues !== '') {
        selectValues = '; SELECT '+selectValues+';';
      }
     console.log('CALL '+spName+'('+inputs+')',paramsDB);
     return promise.using(dbConnections.getDBConnection(dbDialact),function(tx) {
        return tx.queryAsync(setQueries+'CALL '+spName+'('+inputs+')'+selectValues,paramsDB).then(function(rows) {
         return rows;
        }).catch(function (err) {
          console.log(err);
          return {err};
        });
      }); 
    } else if(dbConnections.getDBServer(dbDialact) == 'postgres') {
      let cols = '';
        for(let i = 0; i < aInputValues.length-1; i++) {
            cols += '$'+(i+1)+',';
        }
        if(aInputValues && aInputValues[aInputValues.length-1]) {
          cols += '$'+aInputValues.length;
        }
        console.log(cols);
      return promise.using(dbConnections.getDBConnection(dbDialact),function(tx) {
        return tx.queryAsync('SELECT '+spName+'('+cols+')',aInputValues).then(function(rows) {
         return rows;
        }).catch(function (err) {
          console.log(err);
          return {err};
        });
      }); 
    } else if(dbConnections.getDBServer(dbDialact) == 'mssql') {
    	return promise.using(dbConnections.getDBConnection(dbDialact),function(tx) {
    		console.log('EXEC '+spName+' '+aInputValues.join(','));
        return tx.queryAsync('EXEC '+spName+' '+aInputValues.join(',')+ ';').then(function(rows) {
         return rows;
        }).catch(function (err) {
          console.log(err);
          return {err};
        });
      }); 
    }
  } 

  query(dbDialact,query) {
    return promise.using(dbConnections.getDBConnection(dbDialact),function(tx) {
      return tx.queryAsync(query).then(function(rows) {
        return {rows};
      });
    });
  }

  update(dbDialact,tblName,cols,values,cond) {
    if(cols.length != values.length) {
      throw new Error("invalid query Params passed");
    }
    let fields='';
    for(let i=0; i< cols.length; i++) {
      if(i != cols.length-1) {
        fields += cols[i]+'=?,'
      } else {
        fields += cols[i]+'=?';
      }
    }
    let query = 'UPDATE '+tblName+' SET '+fields+' '+cond;
    console.log(query,values);
    return promise.using(dbConnections.getDBConnection(dbDialact),function(tx) {
      return tx.queryAsync(query,values).then(function(rows) {
        return {rows};
      }).catch(function (err) {
        console.log(err);
        return {err};
      });
    });
  }

  delete(dbDialact,tblName,whereCond,values) {
    let query = 'delete from '+tblName+' where '+whereCond;
    console.log(query,values);
    return promise.using(dbConnections.getDBConnection(dbDialact),function(tx) {
      return tx.queryAsync(query,values).then(function(rows) {
        return {rows};
      });
    });
  }

}


module.exports = CommonInteractor;
