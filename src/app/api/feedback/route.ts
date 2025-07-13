import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface FeedbackData {
  id: string;
  message: string;
  type: string;
  timestamp: string;
  status: "new" | "read" | "responded";
}

const FEEDBACK_FILE = path.join(process.cwd(), "data", "feedback.json");

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read existing feedback
const readFeedback = (): FeedbackData[] => {
  ensureDataDirectory();

  if (!fs.existsSync(FEEDBACK_FILE)) {
    return [];
  }

  try {
    const data = fs.readFileSync(FEEDBACK_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading feedback file:", error);
    return [];
  }
};

// Write feedback data
const writeFeedback = (feedback: FeedbackData[]) => {
  ensureDataDirectory();

  try {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));
  } catch (error) {
    console.error("Error writing feedback file:", error);
    throw error;
  }
};

export async function POST(request: NextRequest) {
  try {
    const { message, type, timestamp } = await request.json();

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Read existing feedback
    const existingFeedback = readFeedback();

    // Create new feedback entry
    const newFeedback: FeedbackData = {
      id: Date.now().toString(),
      message: message.trim(),
      type: type || "layanan",
      timestamp: timestamp || new Date().toISOString(),
      status: "new",
    };

    // Add to existing feedback
    existingFeedback.unshift(newFeedback);

    // Write back to file
    writeFeedback(existingFeedback);

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully",
      id: newFeedback.id,
    });
  } catch (error) {
    console.error("Error processing feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const feedback = readFeedback();
    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
