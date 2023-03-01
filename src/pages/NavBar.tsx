import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchLatest } from "../actions/CurrencyConverterActions";
import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks";

export const NavBar = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLatest());
  }, [dispatch]);

  return (
    <nav className="navbar-container">
      <span className="app-name">
        Currency<strong>Exchange</strong>
      </span>
      <NavLink to="/currency-converter">CURRENCY CONVERTER</NavLink>
      <NavLink to="/history">VIEW CONVERSION HISTORY</NavLink>
    </nav>
  );
};
