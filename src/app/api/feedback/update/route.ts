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

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required" },
        { status: 400 }
      );
    }

    const feedback = readFeedback();
    const index = feedback.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    feedback[index].status = status;
    writeFeedback(feedback);

    return NextResponse.json({
      success: true,
      message: "Feedback updated successfully",
    });
  } catch (error) {
    console.error("Error updating feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
