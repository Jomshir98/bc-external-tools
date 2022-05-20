(() => {
	if (typeof bcModSdk === "undefined") {
		throw new Error("bc-external-tools require BCX to work properly");
	}
	const modApi = bcModSdk.registerMod("bc-external-tools", "1");
	const ProxyClient = (io /** @type {import("socket.io-client").Socket} */)("http://localhost:25501", {
		transports: ["websocket"],
	});
	ProxyClient.on("connect", () => {
		console.log("[bc-external-tools] Connected");
	});
	ProxyClient.on("disconnect", (reason) => {
		console.log("[bc-external-tools] Disconnected:", reason);
	});
	function ProxyConnect() {
		if (!ServerSocket) return;
		ServerSocket.onAny((e, data) => ProxyClient.emit("e", e, data));
	}
	modApi.hookFunction('ServerInit', 0, (args, next) => {
		next(args);
		ProxyConnect();
	});
	ProxyConnect();
})();
