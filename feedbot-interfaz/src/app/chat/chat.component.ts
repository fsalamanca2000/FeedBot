import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SentimentService } from '../services/sentiment.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;

  messages: { text: string; type: 'user' | 'bot' }[] = [];
  newMessage: string = '';

  constructor(private sentimentService: SentimentService) {}

  sendMessage() {
    const message = this.newMessage.trim();
    if (message) {
      this.messages.push({ text: message, type: 'user' });

      this.sentimentService.analyzeSentiment(message).subscribe((response) => {
        const sentiment = response.sentiment; // Ej: 'positivo', 'negativo', etc.
        this.messages.push({ text: `Sentimiento: ${sentiment}`, type: 'bot' });
      });

      this.newMessage = '';
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.chatMessagesContainer) {
      this.chatMessagesContainer.nativeElement.scrollTop =
        this.chatMessagesContainer.nativeElement.scrollHeight;
    }
  }
}

