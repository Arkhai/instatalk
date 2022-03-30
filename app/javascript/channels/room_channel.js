import consumer from "./consumer"

jQuery(document).on 'turbolinks:load', ->
messages = $('#messages')

if messages.length > 0
  createRoomChannel messages.data('room-id')

$(document).on 'keypress', '#message_body', (event) ->
    message = event.target.value
if event.keyCode is 13 && message != ''
App.room.speak(message)
event.target.value = ""
event.preventDefault()

consumer.subscriptions.create({"RoomChannel", roomId: roomId },{
  connected() {
    console.log('Connected to RoomChannel')
  },

  disconnected() {
    console.log('Disconnected from RoomChannel')
  },

  received(data) {
    console.log('Received message: ' + data['message'])
    $('#messages').append data['message']
  },

  speak: function() {
    return this.perform('speak', { message: message });
  }
});
