'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner'; // <- Toast from Sonner
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState([]);
  const [goBackClicked, setGoBackClicked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get('/api/meetings');
        setMeetings(res.data);
      } catch (error) {
        toast.error('❌ Failed to fetch meetings.');
        console.error('Failed to fetch meetings:', error);
      }
    };
    fetchMeetings();
  }, []);

  const handleGoBack = () => {
    setGoBackClicked(true);
    router.push('/');
  };

  const handleMeetingClick = (meetingId: string) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
          router.push(`/summary/${meetingId}`);
        }, 500); // Optional delay to see the loading effect
      }),
      {
        loading: 'Navigating to summary...',
        success: '✅ Meeting loaded successfully!',
        error: '❌ Failed to load meeting',
      }
    );
  };

  return (
    <main className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center w-full">Your Meetings</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((meeting: any) => (
            <Card
              key={meeting.id}
              onClick={() => handleMeetingClick(meeting.id)}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="bg-gray-100 rounded-t px-4 py-3">
                <CardTitle className="text-lg">Meeting: {meeting.customId}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm px-4 py-3 space-y-1">
                <p><strong>Meeting ID:</strong> {meeting.customId}</p>
                <p><strong>Agent:</strong> {meeting.agent?.name ?? 'N/A'}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {meetings.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No meetings found.
          </div>
        )}

        {/* Go Back Button */}
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={handleGoBack}
            disabled={goBackClicked}
          >
            ← Go Back to Home
          </Button>
        </div>
      </div>
    </main>
  );
}
