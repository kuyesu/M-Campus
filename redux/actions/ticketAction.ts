import axios from "axios";
import { URI } from "../URI";
import { Dispatch } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// create ticket
export const createTicketAction =
  (
    title: string,
    image: string,
    user: Object,
    description: Object,
    assignedToUser: Object,
    replies: Array<{ title: string; image: string; user: any }>
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: "ticketCreateRequest",
      });

      const token = await AsyncStorage.getItem("token");

      const { data } = await axios.post(
        `${URI}/create-ticket`,
        { title, image, user, replies, description, assignedToUser },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "ticketCreateSuccess",
        payload: data.user,
      });
    } catch (error: any) {
      dispatch({
        type: "ticketCreateFailed",
        payload: error.response.data.message,
      });
    }
  };

// get all tickets
export const getAllTickets = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: "getAllTicketsRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const { data } = await axios.get(`${URI}/get-all-tickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "getAllTicketsSuccess",
      payload: data.ticekt,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllTicketsFailed",
      payload: error.response.data.message,
    });
  }
};

interface ReplyParams {
  ticketId?: string | null;
  tickets: any;
  user: any;
  replyId?: string | null;
  title?: string;
  image?: string;
  singleReplyId?: string;
}

// add reply
export const addReply =
  (
    ticketId: string,
    replyId: string,
    title: string,
    image: string,
    user: Object,
    tickets: any
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: "ticketUpdateRequest",
      });

      const token = await AsyncStorage.getItem("token");

      const updatedTicket = tickets.map((ticket: any) =>
        ticket._id === ticketId
          ? {
              ...ticket,
              replies: [
                ...ticket.replies,
                {
                  title,
                  image,
                  user,
                  reply: [],
                  likes: [],
                },
              ],
            }
          : ticket
      );

      dispatch({
        type: "getAllTicketsSuccess",
        payload: updatedTicket,
      });

      const { data } = await axios.post(
        `${URI}/add-replies-to-ticket`,
        { ticketId, replyId, title, image, user },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "ticketUpdateSuccess",
        payload: data.ticket,
      });

      // try {
      //   await axios.put(
      //     `${URI}/add-reply-to-ticket`,
      //     { ticketId, replyId, title, image, user },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );
      //   console.log("reply added");
      // } catch (error) {
      //   console.log(error, "error");
      // }
    } catch (error: any) {
      console.log(error, "error");
    }
  };

// add likes
interface LikesParams {
  ticketId?: string | null;
  tickets: any;
  user: any;
  replyId?: string | null;
  title?: string;
  singleReplyId?: string;
}
export const addLikes =
  ({ ticketId, tickets, user }: LikesParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const updatedTickets = tickets.map((userObj: any) =>
        userObj._id === ticketId
          ? {
              ...userObj,
              likes: [
                ...userObj.likes,
                {
                  userName: user.name,
                  userId: user._id,
                  userAvatar: user.avatar.url,
                  ticketId,
                },
              ],
            }
          : userObj
      );

      dispatch({
        type: "getAllTicketsSuccess",
        payload: updatedTickets,
      });

      await axios.put(
        `${URI}/update-likes`,
        { ticketId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: any) {
      console.log(error, "error");
    }
  };

// remove likes
export const removeLikes =
  ({ ticketId, tickets, user }: LikesParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const updatedTickets = tickets.map((userObj: any) =>
        userObj._id === ticketId
          ? {
              ...userObj,
              likes: userObj.likes.filter(
                (like: any) => like.userId !== user._id
              ),
            }
          : userObj
      );
      dispatch({
        type: "getAllTicketsSuccess",
        payload: updatedTickets,
      });

      await axios.put(
        `${URI}/update-likes`,
        { ticketId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error following likes:", error);
    }
  };

// add likes to reply
export const addLikesToReply =
  ({ ticketId, tickets, user, replyId, title }: LikesParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const updatedTickets = tickets.map((ticket: any) =>
        ticket._id === ticketId
          ? {
              ...ticket,
              replies: ticket.replies.map((reply: any) =>
                reply._id === replyId
                  ? {
                      ...reply,
                      likes: [
                        ...reply.likes,
                        {
                          userName: user.name,
                          userId: user._id,
                          userAvatar: user.avatar.url,
                        },
                      ],
                    }
                  : reply
              ),
            }
          : ticket
      );
      dispatch({
        type: "getAllTicketsSuccess",
        payload: updatedTickets,
      });

      await axios.put(
        `${URI}/update-replies-react`,
        { ticketId, replyId, replyTitle: title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error, "error");
    }
  };

// remove likes from reply
export const removeLikesFromReply =
  ({ ticketId, tickets, user, replyId }: LikesParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const updatedTickets = tickets.map((ticket: any) =>
        ticket._id === ticketId
          ? {
              ...ticket,
              replies: ticket.replies.map((reply: any) =>
                reply._id === replyId
                  ? {
                      ...reply,
                      likes: reply.likes.filter(
                        (like: any) => like.userId !== user._id
                      ),
                    }
                  : reply
              ),
            }
          : ticket
      );

      dispatch({
        type: "getAllTicketsSuccess",
        payload: updatedTickets,
      });

      await axios.put(
        `${URI}/update-replies-react`,
        { ticketId, replyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: any) {
      console.log(error, "error");
    }
  };

// add likes to replies > reply
export const addLikesToRepliesReply =
  ({ ticketId, tickets, user, replyId, singleReplyId, title }: LikesParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const updatedTickets = tickets.map((ticket: any) =>
        ticket._id === ticketId
          ? {
              ...ticket,
              replies: ticket.replies.map((r: any) =>
                r._id === replyId
                  ? {
                      ...r,
                      reply: r.reply.map((reply: any) =>
                        reply._id === singleReplyId
                          ? {
                              ...reply,
                              likes: [
                                ...reply.likes,
                                {
                                  userName: user.name,
                                  userId: user._id,
                                  userAvatar: user.avatar.url,
                                },
                              ],
                            }
                          : reply
                      ),
                    }
                  : r
              ),
            }
          : ticket
      );

      dispatch({
        type: "getAllTicketsSuccess",
        payload: updatedTickets,
      });
      await axios.put(
        `${URI}/update-reply-react`,
        { ticketId, replyId, singleReplyId, replyTitle: title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error, "error");
    }
  };

// remove likes from replies > reply
export const removeLikesFromRepliesReply =
  ({ ticketId, tickets, user, replyId, singleReplyId }: LikesParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const updatedTickets = tickets.map((ticket: any) =>
        ticket._id === ticketId
          ? {
              ...ticket,
              replies: ticket.replies.map((r: any) =>
                r._id === replyId
                  ? {
                      ...r,
                      reply: r.reply.map((reply: any) =>
                        reply._id === singleReplyId
                          ? {
                              ...reply,
                              likes: reply.likes.filter(
                                (like: any) => like.userId !== user._id
                              ),
                            }
                          : reply
                      ),
                    }
                  : r
              ),
            }
          : ticket
      );

      dispatch({
        type: "getAllTicketsSuccess",
        payload: updatedTickets,
      });

      await axios.put(
        `${URI}/update-reply-react`,
        { ticketId, replyId, singleReplyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: any) {
      console.log(error, "error");
    }
  };
