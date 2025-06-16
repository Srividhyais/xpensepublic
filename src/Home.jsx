import React, { useState, useEffect } from "react";
import AddBalForm from "./components/AddBalForm";
import ExpenseForm from "./components/Expense";
import TransList from "./components/TransList";
import ExpPieChart from "./components/Piechart";
import ExpBarChart from "./components/Barchart";
import Modal from "./components/AddModal";
import Card from "./components/Card";
import styles from "./Home.module.css";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Show/hide modals
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isOpenBalance, setIsOpenBalance] = useState(false);

  const [categorySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  // eslint-disable-next-line
  const [categoryCount, setCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  useEffect(() => {
    const localBalance = localStorage.getItem("balance");

    if (localBalance) {
      setBalance(Number(localBalance));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }

    const items = JSON.parse(localStorage.getItem("expenses"));
    setExpenseList(Array.isArray(items) ? items : []);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (expenseList.length > 0 || isMounted) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
    }

    if (expenseList.length > 0) {
      setExpense(
        expenseList.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.price),
          0
        )
      );
    } else {
      setExpense(0);
    }

    let foodSpends = 0,
      entertainmentSpends = 0,
      travelSpends = 0;
    let foodCount = 0,
      entertainmentCount = 0,
      travelCount = 0;

    expenseList.forEach((item) => {
      if (item.category === "food") {
        foodSpends += Number(item.price);
        foodCount++;
      } else if (item.category === "entertainment") {
        entertainmentSpends += Number(item.price);
        entertainmentCount++;
      } else if (item.category === "travel") {
        travelSpends += Number(item.price);
        travelCount++;
      }
    });

    setCategorySpends({
      food: foodSpends,
      travel: travelSpends,
      entertainment: entertainmentSpends,
    });

    setCategoryCount({
      food: foodCount,
      travel: travelCount,
      entertainment: entertainmentCount,
    });
  }, [expenseList, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance, isMounted]);

  return (
    <>
      <div className={styles.container}>
        <h1>Expense Tracker</h1>

        <div className={styles.cardsWrapper}>
          <Card
            title="Wallet Balance"
            money={balance}
            buttonText="+ Add Income"
            buttonType="success"
            handleClick={() => {
              setIsOpenBalance(true);
            }}
          />

          <Card
            title="Expenses"
            money={expense}
            buttonText="+ Add Expense"
            buttonType="failure"
            success={false}
            handleClick={() => {
              setIsOpenExpense(true);
            }}
          />

          <ExpPieChart
            data={[
              { name: "Food", value: categorySpends.food },
              { name: "Entertainment", value: categorySpends.entertainment },
              { name: "Travel", value: categorySpends.travel },
            ]}
          />
        </div>

        <div className={styles.transactionsWrapper}>
          <TransList
            transactions={expenseList}
            editTransactions={setExpenseList}
            title="Recent Transactions"
            balance={balance}
            setBalance={setBalance}
          />

          <ExpBarChart
            data={[
              { name: "Food", value: categorySpends.food },
              { name: "Entertainment", value: categorySpends.entertainment },
              { name: "Travel", value: categorySpends.travel },
            ]}
          />
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
        <ExpenseForm
          setIsOpen={setIsOpenExpense}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          setBalance={setBalance}
          balance={balance}
        />
      </Modal>

      <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
        <AddBalForm setIsOpen={setIsOpenBalance} setBalance={setBalance} />
      </Modal>
    </>
  );
}
