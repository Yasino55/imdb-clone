import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { message: "You must be logged in to view the watch list." },
      { status: 401 }
    );
  } else {
    try {
      const user = session.user;
      const itemId = req.nextUrl.searchParams.get("itemId");

      if (!itemId) {
        // return {error: "Something went wrong try again later please."}
        return NextResponse.json(
          { message: "Item ID is required." },
          { status: 400 }
        );
      }

      // Check if the item is in the watch list
      const existingWatchList = await prisma.favorite.findFirst({
        where: {
          userId: user.id,
          itemId: parseInt(itemId),
        },
      });

      const isInWatchList = !!existingWatchList;

      return NextResponse.json({ isInWatchList }, { status: 200 });
    } catch (error) {
      console.error("Error checking watch list status:", error);
      return NextResponse.json(
        { error: "Internal server error while checking watch list status." },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { message: "You must be logged in." },
        { status: 401 }
      );
    }

    const { user } = session;
    const { itemId, itemType } = await req.json();

    const existingWatchList = await prisma.favorite.findFirst({
      where: {
        userId: user.id,
        itemId: itemId,
      },
    });

    if (existingWatchList) {
      return NextResponse.json(
        { Message: "Already in watch list." },
        { status: 400 }
      );
    }

    const watchList = await prisma.favorite.create({
      data: {
        userId: user.id as string,
        itemId: itemId,
        itemType: itemType,
      },
    });
    return NextResponse.json(watchList, { status: 200 });
  } catch (error) {
    console.error("Error adding to watch list:", error);
    return NextResponse.json(
      { error: "Error adding to watch list" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return { error: "You must be logged in to remove from watch list." };
      // return NextResponse.json(
      //   { message: "You must be logged in." },
      //   { status: 401 }
      // );
    }

    const { user } = session;
    const { itemId } = await req.json();

    await prisma.favorite.deleteMany({
      where: {
        userId: user?.id,
        itemId: itemId,
      },
    });

    return NextResponse.json(
      { message: "Removed from watch list." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing from watch list:", error);
    return NextResponse.json(
      { message: "Error removing from watch list" },
      { status: 500 }
    );
  }
}
