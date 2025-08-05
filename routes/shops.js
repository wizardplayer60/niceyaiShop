var express = require('express');
const tokenVerify = require('../middlewares/tokenHandle');
var router = express.Router();
var fs = require('fs');
const CoffeeShop = [
  {
    name: "Graph Cafe",
    province: "เชียงใหม่",
    district: "เมืองเชียงใหม่"
  },
  {
    name: "Ristr8to Coffee",
    province: "เชียงใหม่",
    district: "เมืองเชียงใหม่"
  },
  {
    name: "The Little Prince Café Bangkok",
    province: "กรุงเทพมหานคร",
    district: "เขตสาทร"
  },
  {
    name: "Ryoku Cafe",
    province: "กรุงเทพมหานคร",
    district: "เขตวัฒนา"
  },
  {
    name: "Harudot Chonburi by Nana Coffee Roaster",
    province: "ชลบุรี",
    district: "เมืองชลบุรี"
  },
  {
    name: "Carp cafe'sriracha",
    province: "ชลบุรี",
    district: "ศรีราชา"
  },
  {
    name: "Refill Coffee",
    province: "ขอนแก่น",
    district: "เมืองขอนแก่น"
  },
  {
    name: "Godfather Coffee - II Khonkaen",
    province: "ขอนแก่น",
    district: "เมืองขอนแก่น"
  },
  {
    name: "Campus Coffee Roaster",
    province: "ภูเก็ต",
    district: "เมืองภูเก็ต"
  },
  {
    name: "The Feelsion Cafe",
    province: "ภูเก็ต",
    district: "เมืองภูเก็ต"
  }
]
router.get('/', tokenVerify, function (req, res, next) {
  const shops = require('./shops.json');
  const search = req.query?.search || '';
  let list = [];
  if (search) {
    shops.data.forEach(shop => {
      if (shop.name.includes(search)) {
        list.push(shop);
      }
    });
  } else {
    list = shops.data;
  }
  res.status(200).json({
    success: true,
    count: list.length,
    data: list
  })
});
router.post('/', tokenVerify, function (req, res) {
  const body = req.body;
  if (!body.name) {
    throw new Error("กรุณาส่งชื่อมาด้วย")
  }
  if (!body.province) {
    throw new Error("กรุณาส่งจังหวัดมาด้วย")
  }
  if (!body.district) {
    throw new Error("กรุณาส่งอำเภอมาด้วย")
  }
  const shops = require('./shops.json');
  shops.count++;
  shops.data.push({
    id: shops.count,
    name: body.name,
    province: body.province,
    district: body.district
  })
  try {
    fs.writeFileSync('./routes/shops.json', JSON.stringify(shops, null, 2))
    res.status(200).json({
      success: true,
      message: "เพิ่มร้านกาแฟสำเร็จ"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "เพิ่มร้านกาแฟไม่สำเร็จ"
    })
  }
})
router.delete('/:id', tokenVerify, function (req, res) {
  const id = req.params.id;
  const shops = require('./shops.json');
  shops.data = shops.data.filter(shop => shop.id != id);
  try {
    fs.writeFileSync('./routes/shops.json', JSON.stringify(shops, null, 2))
    res.status(200).json({
      success: true,
      message: "ลบร้านกาแฟสำเร็จ"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "ลบร้านกาแฟไม่สำเร็จ"
    })
  }
})
router.put('/:id', tokenVerify, function (req, res) {
  const id = req.params.id;
  const body = req.body;
  const shops = require('./shops.json');
  shops.data = shops.data.map(shop => shop.id == id ? { ...shop, ...body } : shop);
  try {
    fs.writeFileSync('./routes/shops.json', JSON.stringify(shops, null, 2))
    res.status(200).json({
      success: true,
      message: "แก้ไขร้านกาแฟสำเร็จ"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "แก้ไขร้านกาแฟไม่สำเร็จ"
    })
  }
})

module.exports = router;
