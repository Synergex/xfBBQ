import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFavorites } from "../../redux/actions/favoriteActions";
import { loadUsers } from "../../redux/actions/userActions";
import Spinner from "../../Spinner";
import FavoritesTable from "./FavoritesTable";
import initialState from "../../redux/reducers/initialState";

export default function FavoritesList() {
  document.title = "𝘹𝘧BBQ - Favorites";

  // Get users and favorites
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const favorites = useSelector(state => state.favorites);
  const users = useSelector(state => state.users);
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadUserFavorites(login.Id));
  }, [dispatch, login]);

  return (
    <div className="jumbotron">
      <h2>Favorites</h2>
      {favorites.length <= 0 ||
      JSON.stringify(users) === JSON.stringify(initialState.users) ? (
        <Spinner />
      ) : (
        <FavoritesTable
          favorites={favorites.value}
          users={users}
          login={login}
        />
      )}
    </div>
  );
}
