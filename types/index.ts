export interface IRasaMessage {
  sender: string;
  message: string;
}

export interface IButton {
  title: string;
  payload: string;
}

export interface IRadioCheckbox {
  template_type: "radio" | "checkbox";
  text: string;
  payload?: string;
  slot: string;
  buttons: {
    type?: string;
    title?: string;
    payload?: string;
  }[];
}

export interface IRasaResponse {
  text?: string;
  image?: string;
  custom: IButtonTemplate; // this arrives when Rasa sends a json_message
  template?: string;
  response?: string;
  attachment?: string;
  buttons?: IButton[];
  elements?: object[];
}

// Using as reference Facebook schemas
// https://developers.facebook.com/docs/messenger-platform/send-messages/templates
export interface IButtonTemplate {
  type: string;
  payload: IRadioCheckbox;
  url: string;
}

interface Event {
  courseId: string;
  day: number;
  startTime: string;
  endTime: string;
  color?: string;
  title?: string;
  location?: string;
  section?: string;
  groupIndex?: number; // index of the group in eventGroups array that this event belongs to
}

interface Events {
  startTimes: string[];
  endTimes: string[];
  days: number[];
  locations: string[];
}

interface Sections {
  [section: string]: Events;
}

interface EventGroup {
  courseId: string;
  sections: Sections;
  title?: string;
}

interface Configs {
  startHour: number;
  endHour: number;
  numOfHours: number;
  cellWidth: number;
  cellHeight: number;
  numOfDays: number;
  numOfDaysPerPage: number;
  timeTicksWidth: number;
}

export { EventGroup, Events, Event, Configs };
