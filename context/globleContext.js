//globleContext.js
import React from "react";

const artcilesAllData = []
const culumListData = []
const tableLoading = false
const tsxHello = {
  background:'red',
  color:'#fff'
}
const artcilesAllDataContext = React.createContext(artcilesAllData)
const artcilesTableLoadingContext = React.createContext(tableLoading)
const culumListDataContext = React.createContext(culumListData)

const tsxHelloContext = React.createContext(tsxHello)


export {
  artcilesAllData,
  artcilesAllDataContext,
  culumListData,
  culumListDataContext,
  tableLoading,
  artcilesTableLoadingContext,
  tsxHelloContext
}