import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('client');
  protected members = signal<any[]>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers());
  }

  async getMembers(): Promise<any[]> {
    try {
      return await lastValueFrom(this.http.get<any[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.error('API members Error:', error);
      return [];
    }
  }
}
