import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Homepage from '@/models/Homepage';
import { isAdminRequest } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    let config = await Homepage.findOne({ singletonId: 'homepage_config' });
    
    // Return default empty structure if it doesn't exist yet
    if (!config) {
      config = await Homepage.create({
        singletonId: 'homepage_config',
        heroBannerImage: '/images/afterheroimage.jpg',
        fullWidthImage: '/images/afterheroimage.jpg',
        overviewHeading: 'Aircraft Overview',
        overviewSubheading: 'Explore Our Fleet',
        techHeading: 'Technology meets design',
        techSubheading: 'More than just speed.',
        techSubtext: 'Every aspect of our aircraft is carefully considered...',
        communityHeading: 'What\'s it like to fly the Guildmaster?',
        communitySubheading: 'Experiences from our community.',
        testimonials: [],
        ctaHeading: 'Join the Fleet',
        ctaSubheading: 'Want to make an inquiry or just have questions?'
      });
    }
    
    return NextResponse.json(config, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch homepage data' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const isAuthed = await isAdminRequest();
    if (!isAuthed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await request.json();
    await dbConnect();
    
    const updatedConfig = await Homepage.findOneAndUpdate(
      { singletonId: 'homepage_config' },
      { $set: data },
      { new: true, upsert: true }
    );
    
    revalidatePath('/');
    
    return NextResponse.json({ message: 'Homepage updated successfully', config: updatedConfig }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update homepage' }, { status: 500 });
  }
}
