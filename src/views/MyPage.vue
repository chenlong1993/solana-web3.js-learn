<template>
  <div>
    <button @click="testRpc">测试链接</button>
    <br/>
    <br/>
    <button @click="roundRobinSlotRequest">round robin</button>
    <br/>
    <br/>
    <button @click="shardingButtonClick">分片</button>
  </div>
</template>

<script>
import { createSolanaRpc } from '@solana/web3.js';

export default {
  data() {
    return {
      rpcClients: [], // 用于存储多个RPC客户端
      currentRpcIndex: 0, // 当前使用的RPC客户端索引
      slot: null
    };
  },
  methods: {
    async initRpc() {
      // Create an RPC client.
      this.rpc = createSolanaRpc('http://127.0.0.1:8899');
    },
    async testRpc() {
      if (!this.rpc) {
        await this.initRpc();
      }
      try {
        // Send a request.
        this.slot = await this.rpc.getSlot().send();
        alert(`获取到的slot信息为: ${this.slot}`);
      } catch (error) {
        alert(`获取slot信息时出错: ${error}`);
      }
    },
    // 创建多个RPC客户端用于轮询（这里简化为创建两个示例）
    async createRpcClients() {
      const rpc1 = createSolanaRpc('http://127.0.0.1:8899');
      const rpc2 = createSolanaRpc('http://127.0.0.1:8898');
      this.rpcClients.push(rpc1, rpc2);
    },
    async roundRobinSlotRequest() {
      if (this.rpcClients.length === 0) {
        await this.createRpcClients();
      }
      try {
        const currentRpc = this.rpcClients[this.currentRpcIndex];
        this.slot = await currentRpc.getSlot().send();
        alert(`通过轮询获取到的slot信息为: ${this.slot}`);
        // 更新当前使用的RPC客户端索引，实现轮询效果
        this.currentRpcIndex = (this.currentRpcIndex + 1) % this.rpcClients.length;
      } catch (error) {
        alert(`轮询获取slot信息时出错: ${error}`);
      }
    }
  },
  mounted() {
    this.initRpc();
  }
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>