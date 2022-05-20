const PORT = 25501;

const io = require("socket.io");
const server = new io.Server(PORT, {
	cors: {
		origin: /./,
	},
});

server.on("connection", socket => {
	console.log("Internal: New connection");
	socket.on("disconnect", (reason) => {
		console.log("Internal: Disconnected:", reason);
	});
	socket.on("e", (e, data) => {
		if (!data) return;
		if (e === "ChatRoomMessage") {
			if (data.Type === "Chat" || data.Type === "Emote") {
				console.log(`Message:${data.Type}:${data.Sender}:${data.Content}`);
			} else if (data.Type === "Action") {
				let res = `Message:${data.Type}:${data.Content}:${data.Sender}: `;
				const DestNumber = data.Dictionary?.find(d => d?.Tag === "DestinationCharacter")?.MemberNumber;
				if (DestNumber) {
					res += `Dest:${DestNumber} `;
				}
				const Asset = data.Dictionary?.find(d => d?.Tag === "AssetName")?.AssetName;
				if (Asset) {
					res += `Asset:${Asset} `;
				}
				console.log(res);
			}
		}
	})
});
