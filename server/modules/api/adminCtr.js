import { sqlExecOne } from '../../resource/db/mysqlConnection';
import {
  resSuccessObj,
  resFailObj,
} from '../../misc/helper';

export const getAnonymousColor = (req, res, next) => {
  const qr = 'SELECT * FROM colorpk_color a WHERE a.display = 1';
  sqlExecOne(qr).then((data) => {
    res.json(resSuccessObj(data));
  }, (data) => {
    res.json(resFailObj(data));
  });
}

export const postDecideColor = (req, res, next) => {
  let decision = req.body.display,
    id = req.body.id,
    query = null;

  if(typeof id === 'number'){
    if(decision){
      query = `DELETE FROM colorpk_color WHERE id = '${id}'`;
    }else{
      query = `UPDATE colorpk_color SET \`display\` = 0 WHERE id = ${id}`;
    }

    sqlExecOne(query).then((data) => {
      res.json(resSuccessObj(data));
    }, (data) => {
      res.json(resFailObj(data));
    });
  } else {
    res.json({
      error: true,
    });
  }
}
