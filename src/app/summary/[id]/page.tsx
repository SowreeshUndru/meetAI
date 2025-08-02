// File: src/app/summary/[id]/page.tsx
import { notFound } from 'next/navigation';
import ClientChatPanel from './ClientChatPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { id: string } }) {
  const meetingId = params.id;
  return {
    title: `Meeting Summary - ${meetingId}`,
  };
}

export default async function SummaryPage({ params }: { params: { id: string } }) {
  const meetingId = params.id;

  const meeting = await prisma.room.findUnique({
    where: { id: meetingId },
    include: {
      agent: true,
    },
  });

  if (!meeting) {
    notFound();
  }

  return (
    <main className="flex h-screen w-full text-sm">
      {/* Left Panel */}
      <div className="w-1/2 border-r p-6 flex flex-col justify-between">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Meeting Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Meeting ID:</strong> {meeting.id}</p>
            <p><strong>Custom ID:</strong> {meeting.customId}</p>
            <p><strong>Agent Instruction:</strong> {meeting.agent?.instructions}</p>
            <p><strong>Created At:</strong> {new Date(meeting.createdAt).toLocaleString()}</p>
            <p><strong>Created By:</strong> {meeting.createdById}</p>
          </CardContent>
        </Card>

        <ClientChatPanel id={meetingId} />
      </div>

      {/* Right Panel */}
      <div className="w-1/2 p-6 overflow-auto bg-gray-50 border-l">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-xl">AI Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div id="ai-response" className="prose prose-sm max-w-none" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}