<template>
  <button @click="showMessage">点击我</button>
</template>

<script>
import { createSolanaRpc } from '@solana/web3.js';

export default {
  data() {
    return {
      rpc: null,
      slot: null
    };
  },
  methods: {
    async initRpc() {
      // Create an RPC client.
      this.rpc = createSolanaRpc('http://127.0.0.1:8899');
    },
    async showMessage() {
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