declare type Message = {
    sender: User

    content: MessageContent

    context: {
        previousMessage: ?Message
        nextMessage: ?Message
    }
    
    metadata: {
        sentAt: Date
    }
}

declare type MessageContent = {
    text: string
}