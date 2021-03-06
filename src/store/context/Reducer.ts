import { client } from "api/client";
import { Endpoint } from "api/endpoint";
import { showToast } from "components";
import { FeedBack, Profile } from "models/user";
import { Reducer as ReduxReducer } from "redux";
import { ThunkAction } from "store/configureAction";
import { ActionType } from "./ActionType";
import { ContextState, InitState } from "./InitState";

interface Loading {
	type: string;
	loading?: boolean;
}

interface FieldChangeAction {
	type: string;
	fieldName: any;
	fieldValue: any;
}
export type KnowAction = Loading | FieldChangeAction;

export const ActionCreators = {
	FieldChange:
		(fieldName: string, fieldValue: any): ThunkAction<KnowAction> =>
			(dispatch, getState) => {
				dispatch({
					type: ActionType.FIELD_CHANGE,
					fieldName: fieldName,
					fieldValue: fieldValue,
				});
			},
	GetProfile:
		(): ThunkAction<KnowAction> =>
			async (dispatch, getState) => {
				try {
					const rsp = await client.get(Endpoint.PROFILE);
					if (rsp?.status == 200) {
						console.log(rsp.data);
						
						dispatch({
							type: ActionType.FIELD_CHANGE,
							fieldName: 'profile',
							fieldValue: rsp.data,
						});
					}

				} catch (error) {
					showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
				}
			},
	UpdateProfile: (profile: Profile): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				delete profile.id;
				delete profile.passwordHash;
				delete profile.lastLoginDate;
				delete profile.lastOnlineDate;
				delete profile.isOnline;
				delete profile.userType;
				delete profile.status;
				delete profile.createdDate;
				delete profile.updatedDate;
				console.log(profile, '123131231223');

				const rsp = await client.put(Endpoint.PROFILE, profile, {}, true);

				if (rsp?.status == 200) {
					showToast('info', 'Thay đổi thông tin thành công!');
					dispatch({
						type: ActionType.FIELD_CHANGE,
						fieldName: 'profile',
						fieldValue: rsp.data,
					});
				}

			} catch (error) {
				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	GetDoctor: (id: string, limit: number, offset: number, search?: string): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				let url = Endpoint.GET_DOCTOR.replace('{departmentId}', id);
				url += `?limit=${limit}&offset=${offset}`;
				if (search && search != '') url += `&search=${search}`;
				console.log(url);
				let listDoctor = getState().ContextState.listDoctor ?? [];
				const rsp = await client.get(url);
				if (rsp?.status == 200 || rsp?.status == 201) {
					// console.log(rsp.data);

					if (rsp.data.items.length == 0)
						dispatch({
							type: ActionType.FIELD_CHANGE,
							fieldName: 'loadmore',
							fieldValue: {
								offset: offset,
								isEnd: true
							},
						});
					else
						dispatch({
							type: ActionType.FIELD_CHANGE,
							fieldName: 'listDoctor',
							fieldValue: [...listDoctor, ...rsp.data.items],
						});

				}

			} catch (error) {
				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	GetQuestion: (limit: number, offset: number, search?: string): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				let url = Endpoint.GET_QUESTION;
				url += `?limit=${limit}&offset=${offset}`;
				if (search && search != '') url += `&search=${search}`;
				console.log(url);
				let listQuestion = getState().ContextState.listQuestion ?? [];
				const rsp = await client.get(url);
				if (rsp?.status == 200 || rsp?.status == 201) {
					console.log(rsp.data.items.length);

					if (rsp.data.items.length == 0)
						dispatch({
							type: ActionType.FIELD_CHANGE,
							fieldName: 'loadmoreQuestion',
							fieldValue: {
								offset: offset,
								isEnd: true
							},
						});
					else
						dispatch({
							type: ActionType.FIELD_CHANGE,
							fieldName: 'listQuestion',
							fieldValue: [...listQuestion, ...rsp.data.items],
						});

				}

			} catch (error) {
				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	PostFeedBack: (feedback: FeedBack): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				const rsp = await client.post(Endpoint.FEEDBACK, feedback, {}, true);

				if (rsp?.status == 200 || rsp?.status == 201) {
					showToast('info', 'Gửi trợ giúp thành công!');
					// dispatch({
					// 	type: ActionType.FIELD_CHANGE,
					// 	fieldName: 'profile',
					// 	fieldValue: rsp.data,
					// });
				}

			} catch (error) {
				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	BookDoctor: (doctorId, body): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				let url = Endpoint.BOOK_DOCTOR + '/' + doctorId;
				const rsp = await client.post(url, body, {}, true);
				console.log(rsp?.data);
				if (rsp?.status == 201 || rsp?.status == 200) {
					dispatch({
						type: ActionType.FIELD_CHANGE,
						fieldName: 'detailBook',
						fieldValue: rsp?.data,
					});
				}
			} catch (error) {
				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
				dispatch({
					type: ActionType.FIELD_CHANGE,
					fieldName: 'isBooking',
					fieldValue: false,
				});
			}
		},
	GetSchedule: (): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				const rsp = await client.get(Endpoint.SCHEDULE, {});
				if (rsp?.status == 201 || rsp?.status == 200) {
					console.log(rsp.data);
					
					dispatch({
						type: ActionType.FIELD_CHANGE,
						fieldName: 'listSchedule',
						fieldValue: rsp.data,
					});
				}
			} catch (error) {
				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	GetHistory: (): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				const rsp = await client.get(Endpoint.HISTORY, {});
				if (rsp?.status == 201 || rsp?.status == 200) {
					dispatch({
						type: ActionType.FIELD_CHANGE,
						fieldName: 'listHistory',
						fieldValue: rsp.data,
					});
				}
			} catch (error) {
				console.log(error);

				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	ChangeStatusSchedule: (id, status): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				let url = Endpoint.SCHEDULE + '/status/' + id;
				const rsp = await client.put(url, { 'status': status }, true);
				if (rsp?.status == 201 || rsp?.status == 200) {
					dispatch({
						type: ActionType.FIELD_CHANGE,
						fieldName: 'isChangeStatus',
						fieldValue: { ...getState().ContextState.isChangeStatus, display: true },
					});
					showToast('info', 'Thay đổi thông tin thành công!');
				}
			} catch (error) {
				console.log(error);

				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	GetUserAdmin: (limit: number, offset: number, search?: string): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				let url = Endpoint.GET_USER;
				url += `?limit=${limit}&offset=${offset}`;
				if (search && search != '') url += `&search=${search}`;
				console.log(url);
				let listUserAdmin = getState().ContextState.listUserAdmin ?? [];
				const rsp = await client.get(url);
				if (rsp?.status == 200 || rsp?.status == 201) {
					console.log(rsp.data);

					if (rsp.data.items.length == 0)
						dispatch({
							type: ActionType.FIELD_CHANGE,
							fieldName: 'loadmoreUser',
							fieldValue: {
								offset: offset,
								isEnd: true
							},
						});
					else
						dispatch({
							type: ActionType.FIELD_CHANGE,
							fieldName: 'listUserAdmin',
							fieldValue: [...listUserAdmin, ...rsp.data.items],
						});

				}

			} catch (error) {
				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	GetDoctorAdmin: (limit: number, offset: number, search?: string): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				let url = Endpoint.DOCTOR_ADMIN;
				url += `?limit=${limit}&offset=${offset}`;
				if (search && search != '') url += `&search=${search}`;
				console.log(url);
				let listDoctor = getState().ContextState.listDoctor ?? [];
				const rsp = await client.get(url);
				if (rsp?.status == 200 || rsp?.status == 201) {
					// console.log(rsp.data);

					if (rsp.data.items.length == 0)
						dispatch({
							type: ActionType.FIELD_CHANGE,
							fieldName: 'loadmore',
							fieldValue: {
								offset: offset,
								isEnd: true
							},
						});
					else
						dispatch({
							type: ActionType.FIELD_CHANGE,
							fieldName: 'listDoctor',
							fieldValue: [...listDoctor, ...rsp.data.items],
						});

				}

			} catch (error) {
				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	AddDoctor: (doctor: any): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				let url = Endpoint.DOCTOR_ADMIN;
				const rsp = await client.post(url, doctor);
				if (rsp?.status == 200 || rsp?.status == 201) {
					dispatch({
						type: ActionType.FIELD_CHANGE,
						fieldName: 'doctorId',
						fieldValue: rsp.data.id
					});
				}

			} catch (error) {
				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	UpdateDoctor: (doctor: any): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				let url = Endpoint.DOCTOR_ADMIN + '/' + doctor.id;
				delete doctor.id;
				delete doctor.quantityChoose;
				console.log(doctor, url);
				const rsp = await client.put(url, doctor);
				if (rsp?.status == 200 || rsp?.status == 201) {
					showToast('info', 'Cập nhật thông tin thành công!');
					dispatch({
						type: ActionType.FIELD_CHANGE,
						fieldName: 'doctorId',
						fieldValue: 'updateDone'
					});
				}

			} catch (error) {
				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	DeleteDoctor: (id: any, cb: any): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				let url = Endpoint.DOCTOR_ADMIN + '/' + id;
				const rsp = await client.delete(url, {});
				if (rsp?.status == 200 || rsp?.status == 201) {
					showToast('info', 'Cập nhật thông tin thành công!');
					cb();
				}

			} catch (error) {
				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	AddAccount: (body: any): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				let id = getState().ContextState.doctorId;
				let url = Endpoint.ADD_ACCOUNT + id;
				const rsp = await client.post(url, body);
				if (rsp?.status == 200 || rsp?.status == 201) {
					showToast('info', 'Đăng ký tài khoản thành công!');
					dispatch({
						type: ActionType.FIELD_CHANGE,
						fieldName: 'doctorId',
						fieldValue: undefined
					});
				}

			} catch (error) {
				if (error.response.data.message == 'EmailExisted')
					showToast('error', 'Tài khoản đã tồn tại!', 'Vui lòng thử lại!');
				else
					showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
	GetFeedback: (): ThunkAction<KnowAction> =>
		async (dispatch, getState) => {
			try {
				const rsp = await client.get(Endpoint.FEEDBACK_ADMN);
				if (rsp?.status == 200 || rsp?.status == 201) {
					console.log(rsp.data, 'cc');

					dispatch({
						type: ActionType.FIELD_CHANGE,
						fieldName: 'feedbackAdmin',
						fieldValue: rsp.data
					});
				}

			} catch (error) {
				showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
			}
		},
};

export const Reducer: ReduxReducer<ContextState, KnowAction> = (
	state: ContextState | undefined,
	incomingAction: KnowAction
): ContextState => {
	if (state == undefined) {
		return InitState;
	}
	let action;
	switch (incomingAction.type) {
		case ActionType.FIELD_CHANGE:
			action = incomingAction as FieldChangeAction;

			return {
				...state,
				[action.fieldName]: action.fieldValue,
			};

		default:
			return state;
	}
};
