declare namespace gapi.client.calendar {
  namespace events {
    function insert(params: {
      calendarId: string;
      resource: {
        summary: string;
        location?: string;
        description?: string;
        start: {
          dateTime: string;
          timeZone: string;
        };
        end: {
          dateTime: string;
          timeZone: string;
        };
      };
    }): Promise<any>;
  }
} 