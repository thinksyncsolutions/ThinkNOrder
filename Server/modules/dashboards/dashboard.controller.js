// controllers/dashboardController.js
const Order = require('../../db/models/Order');
const User = require('../../db/models/User');
const Place = require('../../db/models/Place');
const Branch = require('../../db/models/Branch');

exports.getDashboard = async (req, res) => {
    console.log("Fetching dashboard for user:", req.user);
  try {
    const { role, branchId, userId } = req.user;
    let data = {};

    switch (role) {
      case 'SUPERADMIN':
        data = {
          totalEnterprises: await User.countDocuments({ role: 'OWNER' }),
          activeNodes: await Branch.countDocuments({ status: 'active' }),
          platformRevenue: await Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
          recentOnboarding: await User.find({ role: 'OWNER' }).limit(5).sort({ createdAt: -1 })
        };
        break;

      case 'MANAGER':
      case 'CASHIER':
        const today = new Date().setHours(0,0,0,0);
        data = {
          todayOrders: await Order.countDocuments({ branchId, createdAt: { $gte: today } }),
          netRevenue: await Order.aggregate([
            { $match: { branchId, status: 'COMPLETED', createdAt: { $gte: today } } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
          ]),
          activeTables: `${await Place.countDocuments({ branchId, status: 'OCCUPIED' })}/${await Place.countDocuments({ branchId })}`,
          topSelling: await Order.aggregate([
            { $match: { branchId } },
            { $unwind: "$items" },
            { $group: { _id: "$items.name", sales: { $sum: "$items.quantity" } } },
            { $sort: { sales: -1 } },
            { $limit: 3 }
          ])
        };
        break;

      case 'KITCHEN':
        data = {
          currentLoad: await Order.countDocuments({ branchId, status: 'PREPARING' }),
          pendingKOTs: await Order.countDocuments({ branchId, status: 'PENDING' }),
          completedToday: await Order.countDocuments({ branchId, status: 'COMPLETED', updatedAt: { $gte: new Date().setHours(0,0,0,0) } })
        };
        break;

      default:
        return res.status(403).json({ message: "Role dashboard not defined" });
    }

    res.status(200).json({ success: true, role, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};