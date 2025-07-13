import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  useUserAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal,setShowModal]=useState(true);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const [incomeRes, expenseRes] = await Promise.all([
        axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE),
      ]);

      const incomeList = incomeRes.data.map((item) => ({
        ...item,
        type: "Income",
      }));

      const expenseList = expenseRes.data.map((item) => ({
        ...item,
        type: "expense",
      }));

      const allTransactions = [...incomeList, ...expenseList].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setTransactions(allTransactions);
    } catch (error) {
      console.error("Error fetching transactions", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Transactions</h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="text-center text-gray-500">No transactions found.</div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {transactions.map((item) => (
                 <TransactionInfoCard
                key={item._id}
                title={item.type== 'expense' ? item.category : item.source}
                icon={item.icon}
                date={moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
