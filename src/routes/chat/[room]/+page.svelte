<div class="flex flex-col h-screen">
    <!-- Header -->
    <div
        class="
            border
            flex flex-row gap-0
            justify-between items-middle
        "
    >
        <a href="/" class="bg-foreground text-background border flex items-middle justify-center p-4">
            <span class="block my-auto"> &larr; back</span>
        </a>
        <div class="border grow text-left flex flex-col p-4">
            <span class="text-2xl font-bold"><span class="text-accent">&sol;</span>{roomName}</span>
            <span class="text-sm">300 users connected</span>
        </div>
        <div class="border flex flex-row items-middle justify-center p-4">
            <span class="block my-auto">
                <span class="text-accent font-bold">{currentUser.username}</span>/{currentUser.id}
            </span>
        </div>
    </div>

    <!-- Chat -->
    <div class="py-6 px-4 flex flex-col gap-8 overflow-y-scroll grow" bind:this={chatView}>
        {#each messages as message}
            <div class="flex flex-col gap-0 {message.sender.id === currentUser.id ? 'self-end' : 'self-start'} w-2/3">
                {#if message.sender.id !== message.context.previousMessage?.sender.id}
                    <span class="text-xs">
                        <span class="text-accent">{message.sender.username}</span>/{message.sender.id}
                    </span>
                {/if}
                <div class="border px-2 py-1 {message.sender.id === currentUser.id ? 'bg-foreground text-background' : 'bg-background text-foreground'}">
                    <span>{message.content.text}</span>
                </div>
                {#if message.sender.id !== message.context.nextMessage?.sender.id}
                    <span class="text-xs text-right">
                        <span class="opacity-50">{message.metadata.sentAt.toISOString()}</span>
                    </span>
                {/if}
            </div>
        {/each}
    </div>

    <!-- New message prompt -->
    <form on:submit|preventDefault={sendMessage} class="border flex flex-row justify-stretch">
        <input
            placeholder="Write..."
            required
            class="
                bg-background text-foreground border
                align-text-top
                h-100 grow
                py-0.5 px-2
                resize-none
            "
            bind:value={newMessageContent.text}
        />

        <button
            type="submit"
            class="
                bg-foreground text-background
                py-2 px-4
            "
        >
            Send
        </button>
    </form>

    <!-- Footer -->
    <div class="text-xs px-1 py-0.5 mb-1">
        <span class="text-xs italic opacity-40">
            <span>Anon</span> is typing...
        </span>
    </div>
</div>

<script lang="ts">
import { page } from "$app/stores";
import { send } from "$lib/messages";
    import { tick } from "svelte";

let roomName = $page.params.room.toLowerCase()
let chatView: any

const currentUser: User = {
    username: 'Anon',
    id: '12345',
}

const exampleMessage: Message = {
    sender: {
        username: 'Anon',
        id: '0000',
    },
    content: {
        text: 'lorem ipsum dolot sit amet lorem ipsum dolot  ',
    },
    context: {
        previousMessage: null,
        nextMessage: null,
    },
    metadata: {
        sentAt: new Date(),
    }
}

let messages: Message[] = [
    exampleMessage,
    exampleMessage,
];

let newMessageContent: MessageContent = {
    text: '',
}

async function messageReceived(messageReceived: Message) {
    const lastMessage = messages.at(-1)

    if (lastMessage) {
        lastMessage.context.nextMessage = messageReceived
        messageReceived.context.previousMessage = lastMessage
    }

    messages.push(messageReceived)
    messages = messages

    await tick()
    chatView?.scrollTo(10, chatView?.scrollHeight)
}


function sendMessage() {
    const newMessage = {
        sender: currentUser,
        content: newMessageContent,
        context: {
            previousMessage: null,
            nextMessage: null,
        },
        metadata: {
            sentAt: new Date(),
        }
    }

    send(newMessage)
    messageReceived(newMessage)

    newMessageContent = {
        text: '',
    }
}
</script>