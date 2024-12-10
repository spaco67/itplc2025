import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received registration data:', data);
    
    const delegate = await prisma.delegate.create({
      data: {
        ...data,
        // age is already a string, no conversion needed
      },
    });

    console.log('Successfully created delegate:', delegate);

    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful',
      delegateId: delegate.id 
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error code:', error.code);
      console.error('Prisma error message:', error.message);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Registration failed',
          error: `Database error: ${error.message}`
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Registration failed', 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const delegates = await prisma.delegate.findMany({
      orderBy: {
        registrationDate: 'desc'
      }
    });

    return NextResponse.json(delegates);
  } catch (error) {
    console.error('Error fetching delegates:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database error',
          error: error.message
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching delegates',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}