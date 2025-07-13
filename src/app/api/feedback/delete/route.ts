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

const readFeedback = (): FeedbackData[] => {
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

const writeFeedback = (feedback: FeedbackData[]) => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  try {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));
  } catch (error) {
    console.error("Error writing feedback file:", error);
    throw error;
  }
};

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const feedback = readFeedback();
    const filteredFeedback = feedback.filter((item) => item.id !== id);

    if (filteredFeedback.length === feedback.length) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    writeFeedback(filteredFeedback);

    return NextResponse.json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
