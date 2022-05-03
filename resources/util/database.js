import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS places (
            id     INTEGER PRIMARY KEY NOT NULL,
            title  TEXT NOT NULL,
            imgUri TEXT NOT NULL,
            date   TEXT NOT NULL,
            time   TEXT NOT NULL
        )
        `,
        [],
        () => {
          resolve();
        },
        (failedTransaction, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place) {
  // console.log("**insert**", place);
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO places (title, imgUri, date, time) VALUES (?, ?, ?, ?)
        `,
        [place.title.trim(), place.imgUri, place.date, place.time],
        (_, result) => {
          console.log(result);
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          const places = [];
          for (const item of result.rows._array) {
            places.push(
              new Place(item.title, item.imgUri, item.date, item.time, item.id)
            );
          }
          //   console.log(places);
          resolve(places);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          // console.log(result.rows._array);
          const place = result.rows._array[0];
          resolve(
            new Place(
              place.title,
              place.imgUri,
              place.date,
              place.time,
              place.id
            )
          );
        },
        (_, err) => reject(err)
      );
    });
  });

  return promise;
}

export function updateTitle(id, updatedTitle) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
    UPDATE places
    SET title = ?
    WHERE id = ?
     `,
        [updatedTitle, id],
        (result) => {
          console.log("**updated**");
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}

export function deleteItemFromDb(id) {
  console.log("**deleting**", id);
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
      DELETE FROM places WHERE id = ?`,
        [id],
        () => {
          console.log("**deleted successfully**");
          resolve();
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
}
