// File: src/app/summary/[id]/ClientChatPanel.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

export default function ClientChatPanel({ id }: { id: string }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt || loading) return;

    setLoading(true);

    try {
      const promise = axios.post('/api/AI', { userPrompt: prompt, id });

      toast.promise(promise, {
        loading: '⏳ Waiting for AI...',
        success: (res) => {
          const outer = JSON.parse(res.data.response);
          // 2) drill into outer.response.text
          const text = outer.response?.text ?? 'No response';
       
          // Update the right panel
          const responseElement = document.getElementById('ai-response');
          if (responseElement) {
            // Create a container div
            const container = document.createElement('div');
            container.className = 'prose prose-sm max-w-none';
            
            // Render ReactMarkdown to the container
            const root = document.createElement('div');
            container.appendChild(root);
            
            // Use ReactMarkdown without className prop
            const markdown = <ReactMarkdown>{text}</ReactMarkdown>;
            
            // Render the component using vanilla JS
            root.innerHTML = '';
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = markdown.props.children;
            root.appendChild(tempDiv);
            
            // Replace the existing content
            responseElement.innerHTML = '';
            responseElement.appendChild(container);
          }
          return '✅ AI responded!';
        },
        error: (err) => {
          console.error('AI error:', err);
          return '❌ Error getting AI response';
        },
      });

      await promise;
    } catch (error) {
      // already handled
    } finally {
      setPrompt('');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <Textarea
        rows={4}
        placeholder="Ask something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <Button onClick={handleSend} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask AI'}
      </Button>
    </div>
  );
}