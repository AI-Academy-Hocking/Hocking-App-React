declare namespace gapi.client {
  namespace calendar {
    interface Event {
      id: string;
      summary: string;
      start: {
        dateTime?: string;
        date?: string;
      };
      end: {
        dateTime?: string;
        date?: string;
      };
      location?: string;
      description?: string;
    }

    namespace events {
      function list(request: {
        calendarId: string;
        timeMin: string;
        showDeleted: boolean;
        singleEvents: boolean;
        maxResults: number;
        orderBy: string;
      }): Promise<{ result: { items: Event[] } }>;

      function insert(request: {
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
      }): Promise<{ result: Event }>;
    }
  }
}