// import React,{useEffect}  from 'react'
export function getTableScroll({ extraHeight, id }) {
    if (typeof extraHeight == "undefined") {
      //  默认底部分页64 + 边距10
      extraHeight = 74
    }
    let tHeader = null
    if (id) {
      tHeader = document.getElementById(id) ?
                document.getElementById(id).getElementsByClassName("ant-table-thead")[0] : null
    } else {
      tHeader = document.getElementsByClassName("ant-table-thead")[0]
    }
    //表格内容距离顶部的距离
    let tHeaderBottom = 0
    if (tHeader) {
      tHeaderBottom = tHeader.getBoundingClientRect().bottom
    }
    //窗体高度-表格内容顶部的高度-表格内容底部的高度
    // let height = document.body.clientHeight - tHeaderBottom - extraHeight
    let height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`
    return height
}
// const Table = ()=>{
//     const [scrollY, setScrollY] = useState("")
//     useEffect(() => {
//         setScrollY(getTableScroll())
//     }, [])
//     render (
//         <Table columns={columns} dataSource={this.state.data} scroll={{ x: 1500 ,y:scrollY}}  pagination={false} onScrollCapture={() => this.onScrollEvent()}/>
//     )
// }