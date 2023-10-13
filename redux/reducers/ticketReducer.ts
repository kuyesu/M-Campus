import { createReducer } from "@reduxjs/toolkit";

const intialState = {
  tickets: [],
  ticket: {},
  error: null,
  isSuccess: false,
  isLoadingTicket: false,
};

export const ticketReducer = createReducer(intialState, {
  ticketCreateRequest: (state) => {
    state.isLoadingTicket = true;
  },
  ticketCreateSuccess: (state, action) => {
    state.isLoadingTicket = false;
    state.ticket = action.payload;
    state.isSuccess = true;
  },
  ticketCreateFailed: (state, action) => {
    state.isLoadingTicket = false;
    state.error = action.payload;
  },
  getAllTicketsRequest: (state) => {
    state.isLoadingTicket = true;
  },
  getAllTicketsSuccess: (state, action) => {
    state.isLoadingTicket = false;
    state.tickets = action.payload;
  },
  getAllTicketsFailed: (state, action) => {
    state.isLoadingTicket = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
