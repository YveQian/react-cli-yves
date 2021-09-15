//globleContext.js
import React from "react";

const artcilesAllData = []
const culumListData = []
const tableLoading = false
const artcilesAllDataContext = React.createContext(artcilesAllData)
const artcilesTableLoadingContext = React.createContext(tableLoading)
const culumListDataContext = React.createContext(culumListData)


export {
  artcilesAllData,
  artcilesAllDataContext,
  culumListData,
  culumListDataContext,
  tableLoading,
  artcilesTableLoadingContext
}