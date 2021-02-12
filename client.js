const ProxyClient = (io /** @type {import("socket.io-client").Socket} */)("http://localhost:25501");
const ProxyEvents = [
	"ServerInfo",
	"CreationResponse",
	"LoginResponse",
	"disconnect",
	"ForceDisconnect",
	"ChatRoomSearchResult",
	"ChatRoomSearchResponse",
	"ChatRoomCreateResponse",
	"ChatRoomUpdateResponse",
	"ChatRoomSync",
	"ChatRoomSyncSingle",
	"ChatRoomSyncExpression",
	"ChatRoomSyncPose",
	"ChatRoomSyncArousal",
	"ChatRoomSyncItem",
	"ChatRoomMessage",
	"ChatRoomAllowItem",
	"ChatRoomGameResponse",
	"PasswordResetResponse",
	"AccountQueryResult",
	"AccountBeep",
	"AccountOwnership",
	"AccountLovership"
];
function ProxyConnect() {
	if (!ServerSocket) return;
	for (const e of ProxyEvents) {
		ServerSocket.on(e, data => ProxyClient.emit("e", e, data));
	}
}
const o_ServerInit = ServerInit;
ServerInit = function() {
	window.o_ServerInit();
	ProxyConnect();
}
ProxyConnect();
