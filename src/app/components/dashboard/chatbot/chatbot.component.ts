import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../services.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  outputArea: HTMLElement | null = null;
  respIAHistory: string[] = [];
  userMessageHistory: string[] = [];

  constructor(private chatBot: ServicesService) { }

  ngOnInit(): void {
    this.outputArea = document.getElementById('chat-output');
    if (!this.outputArea) {
      console.error('Output area not found!');
    } else {
      this.response('Hola, eres un chatbot llamado CashBot, saluda, (agrega el emoji de saludo)');
    }
  }

  response(message: string): void {
    this.chatBot.getResponse(message).subscribe((res) => {
      this.respIAHistory.push(res);
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const messageInput = document.getElementById('user-input') as HTMLInputElement;
    const message = messageInput.value.trim();

    if (message !== '') {
      this.userMessageHistory.push(message);
      if (this.outputArea) {
        this.outputArea.insertAdjacentHTML('beforeend', `
          <div class='user-message'>
            <div class='message'>
              ${message}
            </div>
          </div>
        `);
      } else {
        console.error('Output area not found!');
      }

      this.response(message);
    }

    messageInput.value = '';
  }
}
