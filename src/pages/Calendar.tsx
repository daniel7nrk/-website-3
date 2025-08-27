import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for events and deadlines
const mockEvents = [
  {
    id: 1,
    title: "Product Manager Interview",
    date: new Date(2024, 0, 18),
    time: "2:00 PM",
    type: "interview",
    company: "TechCorp",
    location: "Remote"
  },
  {
    id: 2,
    title: "Application Deadline - Senior Developer",
    date: new Date(2024, 0, 20),
    time: "11:59 PM",
    type: "deadline",
    company: "StartupXYZ",
    location: "San Francisco"
  },
  {
    id: 3,
    title: "Networking Event - Tech Meetup",
    date: new Date(2024, 0, 22),
    time: "6:00 PM",
    type: "event",
    company: "Tech Community",
    location: "WeWork Downtown",
    isPublic: true
  },
  {
    id: 4,
    title: "Follow-up Meeting",
    date: new Date(2024, 0, 25),
    time: "10:00 AM",
    type: "meeting",
    company: "InnovateInc",
    location: "Office Building A"
  }
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => isSameDay(event.date, date));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'interview': return 'bg-primary';
      case 'deadline': return 'bg-destructive';
      case 'event': return 'bg-secondary';
      case 'meeting': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Professional Calendar</h1>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-primary" />
          <span className="text-muted-foreground">Track meetings, deadlines & events</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">
                {format(currentDate, 'MMMM yyyy')}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {daysInMonth.map(date => {
                  const dayEvents = getEventsForDate(date);
                  const isSelected = selectedDate && isSameDay(date, selectedDate);
                  
                  return (
                    <button
                      key={date.toString()}
                      onClick={() => setSelectedDate(date)}
                      className={`
                        p-2 h-20 border rounded-lg text-left hover:bg-accent transition-colors
                        ${!isSameMonth(date, currentDate) ? 'text-muted-foreground' : ''}
                        ${isToday(date) ? 'bg-primary/10 border-primary' : ''}
                        ${isSelected ? 'bg-accent border-accent-foreground' : ''}
                      `}
                    >
                      <div className="font-medium">{format(date, 'd')}</div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`w-full h-1 rounded-full ${getEventTypeColor(event.type)}`}
                          />
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents.map(event => (
                    <div key={event.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant={event.type === 'deadline' ? 'destructive' : 'secondary'}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                        <div className="font-medium text-foreground">
                          {event.company}
                        </div>
                        {event.isPublic && (
                          <div className="flex items-center gap-2 text-primary">
                            <Users className="h-3 w-3" />
                            Public Event
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No events scheduled for this date
                </p>
              )}
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle>Event Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm">Interviews</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-sm">Deadlines</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-sm">Public Events</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-sm">Meetings</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;