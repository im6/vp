import { sqlExecOne } from '../resource/mysqlConnection';

export const initColorLatest = (req, res, next) => {
  const qr = 'SELECT a.*, false as `liked` FROM colorpk_color a WHERE a.display=0 ORDER BY id DESC ';
  sqlExecOne(qr).then((data) => {
    res.json(data);
  }, function(data){
    console.error(data);
    res.json(data);
  });
}