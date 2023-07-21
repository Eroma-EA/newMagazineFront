import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import PurchasesCards from "../components/Cards/PurchasesCards";
import { baseGet } from "../store/userSlice/baseSlice";
import { useUser } from "../hooks/useHooksSlice";

const Purchases = () => {
  const loading = useAppSelector((state) => state.userbase.loading);
  const base = useUser();

  const _id = useAppSelector((state) => state.user.user.id);

  return (
    <>
      <div className="purchases">
        <div className="container">
          <div className="purchases_inner">
            {loading ? "Загрузка" : <PurchasesCards posts={base.payment} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Purchases;
