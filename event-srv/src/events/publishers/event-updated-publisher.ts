export class EventUpdatedPublisher extends Publisher<EventCreatedEvent> {
    
    // * make the subject immutable using 'readonly' keyword
    readonly subject = Subjects.EventCreated;   
}