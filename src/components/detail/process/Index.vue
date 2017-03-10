<template>
  <div style="margin-top: 10px;">
    <el-table :data="processData" border>
      <el-table-column type="index" label="# "></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="CPU" prop="cpu" sortable></el-table-column>
      <el-table-column label="内存" prop="storage"></el-table-column>
      <el-table-column label="虚拟内存" prop="virtual_storage"></el-table-column>
      <el-table-column label="常驻内存" prop="resistant_storage"></el-table-column>
      <el-table-column label="终端位置" prop="terminal_locate"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="启动时间" prop="start_time"></el-table-column>
      <el-table-column label="使用CPU时间" prop="cpu_use_time"></el-table-column>
      <el-table-column label="命令" prop="command"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default{
      data(){
          return {
            processData:[]
          }
      }
  }
</script>
