const express=require('express')
const router=express.Router()

const userrouter=require('./user/index')
const userAddress=require('./userAddress/index')

const categoryRouter=require('./category/index')

const foodRouter=require('./food/index')

const discountRouter=require('./discount/index')

const cartrouter=require('./cart/index')
const orderrouter=require('./order/index')

const adminRouter=require('./admin/index')
router.use('/admin',adminRouter)

router.use('/user',userrouter)
router.use('/user/address',userAddress)

router.use('/category',categoryRouter)

router.use('/food',foodRouter)

router.use('/discount',discountRouter)

router.use('/cart',cartrouter)

router.use('/order',orderrouter)

module.exports=router