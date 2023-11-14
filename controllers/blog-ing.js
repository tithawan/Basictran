const path = require("path");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const m_stringlib = require("../models/m_stringlib.js");
//const { data } = require("jquery");

var exp = {};
exp.blog = (req, res) => {
  return res.render(path.resolve("views", "blog-ing"), { name: "Tobi" });
  
};

exp.listName = (req, res) => {
    return res.render(path.resolve("views", "listname"), { name: "Tobi" });
    
};

exp.treecis = (req, res) => {
  return res.render(path.resolve("views", "treecis"), { name: "Tobi" });
  
};

exp.calcuLine = (req, res) => {
  return res.render(path.resolve("views", "calculater-line"), { name: "Tobi" });
  
};

exp.calStackLine = (req, res) => {
  return res.render(path.resolve("views", "calstack-line"), { name: "Tobi" });
  
};

exp.new = (req, res) => {
  return res.render(path.resolve("views", "new"), { number: 65 });
  
};

exp.csslearn = (req, res) => {
  return res.render(path.resolve("views", "csslearn"), {datapic:[
    {pic:"/media/hotdeal/00048-1263954209.png",name:"รูปที่1",discip:"ลายละเอียดรูปที่ 1"},
    {pic:"/media/hotdeal/00049-1263954210.png",name:"รูปที่2",discip:"ลายละเอียดรูปที่ 2"},
    {pic:"/media/hotdeal/00049-1263954210.png",name:"รูปที่3",discip:"ลายละเอียดรูปที่ 3"},
    {pic:"/media/hotdeal/00051-1263954212.png",name:"รูปที่4",discip:"ลายละเอียดรูปที่ 4"},
    {pic:"/media/hotdeal/00052-2223996043.png",name:"รูปที่5",discip:"ลายละเอียดรูปที่ 5"},
    {pic:"/media/hotdeal/00053-2223996044.png",name:"รูปที่6",discip:"ลายละเอียดรูปที่ 6"},
    {pic:"/media/hotdeal/00054-2223996045.png",name:"รูปที่7",discip:"ลายละเอียดรูปที่ 7"},
    {pic:"/media/hotdeal/00055-2223996046.png",name:"รูปที่8",discip:"ลายละเอียดรูปที่ 8"},
  ] });
  
};

exp.sumNumber = (req, res) => {
    //console.log(req.body)
    let data=req.body
    data1 = parseInt(data.dataname)
    data2 = parseInt(data.datalastname)
    let sum = data1 + data2
    //console.log(data)
    return res.status(200).json({data:sum})
  };

  exp.listName1 = (req, res) => {
    let data=req.body
    
    
    console.log(data)
    return res.status(200).json(data)
  };

  exp.layerTree = (req, res) => {
    let data=req.body
    num = parseInt(data.dataLayer)
    let mainStar = [] 
    star = "*"

    for (let i = 0; i < num; i++) {
      //console.log(i+"/")
      star = "*"
      //star = star

      for (let j = 1; j <= i; j++) {
        //console.log(j)
        star = star+"**"

        
        //return res.status(200).json(star)
      }

      mainStar[i] = star
      
    }
    
    //console.log(mainStar)
    return res.status(200).json(mainStar)
  };

  exp.calNumber = (req, res) => {
    
    let data1=req.body
    
    A = parseInt(data1.dataA)
    B = parseInt(data1.dataB)
    let sum = A + B
    //console.log(sum)
    return res.status(200).json(sum)
  };

  exp.calLine = (req, res) => {
    
    let data=req.body
    //console.log(data)
    x = parseInt(data.dataX)
    m = parseInt(data.dataM)
    C = parseInt(data.dataC)
    
    let sumLine = []
    
      for (let i = 0; i <= x; i++) {
        let y = (m*i) + C
        
        sumLine[i] = y
      }


    return res.status(200).json(sumLine)
  };



  exp.calLine2 = (req, res) => {
    
    let data=req.body
    console.log(data)
    let n = parseInt(data.dataN)
    let dataX = data["dataX[]"]
    let valX = dataX[n]
    let x = parseInt(valX)
    let dataM = data["dataM[]"]
    let valM = dataM[n]
    let m = parseInt(valM)
    let dataC = data["dataC[]"]
    let valC = dataC[n]
    let C = parseInt(valC)
    
    let sumX = []
    let sumY = []
    let sumC = []
    sumX[n] = x
    sumC[n] = C
       
        let y = (m*x) + C
        
        

      
        
    
    let sumData = {
      dataX:sumX,
      dataY:y,
      dataC:sumC,
    }

    return res.status(200).json(sumData)
  };
  

module.exports = exp;
