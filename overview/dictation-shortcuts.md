## Dictate from the keyboard

- Hold **Space** in the chat editor for 300 ms to start recording. Release it to transcribe into the draft. A short tap still types a space.
- Press **Enter** during recording to finish and add the transcript to the draft. Release the key and press Enter again to send.
- Press **Escape** to cancel recording or transcription.
- Use **Ctrl+Shift+Space** to toggle recording without holding a key. Rebind this command in Settings → Keyboard.

## Hints where you need them

The microphone's existing tooltip explains the controls. Hold Command on macOS, or Control, to see compact Space, Enter and Esc badges beside the recording controls. The badges respect BB's Show keyboard hints setting.

Enter and Escape also work when you start recording with BB's microphone button.

## Uses your existing voice input

BB keeps control of microphone selection, recording, transcription and the resulting draft. This plugin adds no speech model, server, API key or audio storage. Your existing transcription service's account requirements, network use and charges still apply.

This is whole-recording transcription, not streaming recognition. Text appears after you finish recording.

## Requirements and compatibility

Requires BB 0.46.1 or later, Plugin SDK 0.6.49 or later, a keyboard, microphone access and an available voice-input service in Settings → AI services. Tested on BB 0.46.1 on macOS.

This version uses BB's native composer markup because its public composer API does not expose recorder controls. A BB update or a replacement composer may require an adapter update. Missing or ambiguous recorder buttons cause no action; the plugin never substitutes the Send button.
