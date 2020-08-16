export default {
    begin(state) {
		return state.front;
	},
	end(state) {
		return state.count;
	},
	user(state) {
		return state.userInfo;
	}
}