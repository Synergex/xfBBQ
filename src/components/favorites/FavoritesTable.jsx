import React from "react";
import PropTypes from "prop-types";
import * as orderEnums from "../orders/orderEnums";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteFavorite } from "../../redux/actions/favoriteActions";

export default function FavoritesTable({ favorites, users, login }) {
  const dispatch = useDispatch();

  // Turn individual orders into an array of orders
  let modifiedFavorites = favorites.map(favorite => {
    return {
      ...favorite,
      theirFavorites: [
        {
          meat: favorite.Meat,
          cheese: favorite.Cheese,
          doneness: favorite.Doneness,
          spicy: favorite.Spicy,
          type: favorite.Type,
          count: favorite.Count,
          burnt: favorite.Burnt,
          key: favorite.Id
        }
      ]
    };
  });

  // Combine favorties together
  for (let index = modifiedFavorites.length - 1; index >= 0; index--) {
    const prevIndex = index - 1;
    if (
      prevIndex >= 0 &&
      modifiedFavorites[index].Userid === modifiedFavorites[prevIndex].Userid
    ) {
      modifiedFavorites[prevIndex].theirFavorites = modifiedFavorites[
        prevIndex
      ].theirFavorites.concat(modifiedFavorites[index].theirFavorites);
      modifiedFavorites.splice(index, 1);
    }
  }

  let rowCounter = 0;
  return (
    <table className="table">
      <thead>
        <tr className="table-primary">
          <th>Favored By</th>
          <th>Favorite Order</th>
          <th style={{ width: "15%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {modifiedFavorites.map(favorite => {
          if (login.Type === 3 && login.Id !== favorite.Userid) return <></>;
          return (
            <tr
              key={favorite.Id}
              className={rowCounter++ % 2 === 0 ? "table-secondary" : ""}
            >
              <td>
                {
                  users.value.filter(user => favorite.Userid === user.Id)[0]
                    .Name
                }
              </td>
              <td>
                {favorite.theirFavorites.map(theirFavorite => {
                  return theirFavorite.meat > 0 ? (
                    <div key={theirFavorite.key}>
                      {"Hamburger: "}
                      {orderEnums.meatType[theirFavorite.meat]}
                      {theirFavorite.meat === 1 ? (
                        <>
                          <br />
                          {orderEnums.beefDoneness[theirFavorite.doneness]}
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      {"Cheese: "}
                      {theirFavorite.cheese}
                      <br />
                      {"Spicy: "}
                      {theirFavorite.spicy}
                      <br />
                      {"=========="}
                      <br />
                    </div>
                  ) : (
                    <div key={theirFavorite.key}>
                      {"Hotdog: "}
                      {orderEnums.hotdogType[theirFavorite.type]}
                      <br />
                      {"Count: "}
                      {theirFavorite.count}
                      <br />
                      {"Burnt: "}
                      {theirFavorite.burnt === 1 ? "Yes" : "No"}
                      <br />
                      {"=========="}
                      <br />
                    </div>
                  );
                })}
              </td>
              <td>
                <button type="button" className="btn btn-primary btn-sm">
                  <span role="img" aria-label="edit">
                    📝
                  </span>
                </button>{" "}
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this favorite order?"
                      )
                    ) {
                      toast.info(
                        "Deleting favorite order " + favorite.Id + "..."
                      );
                      favorites
                        .filter(
                          favoriteIter =>
                            favorite.Userid === favoriteIter.Userid
                        )
                        .forEach(favorite =>
                          dispatch(deleteFavorite(favorite))
                        );
                    }
                  }}
                >
                  <span role="img" aria-label="delete">
                    🗑️
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

FavoritesTable.propTypes = {
  login: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired
};
