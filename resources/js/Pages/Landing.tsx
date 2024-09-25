import Feature from "@/Components/Feature";
import Pricing from "@/Components/Pricing";
import Hero from "@/Components/Hero";
import Layout from "@/Components/Layout/Layout";
import SeoHead from "@/Components/SeoHead";
import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Landing({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
          <SeoHead title='LaslesVPN Landing Page' />
          <Layout>
            <Hero />
            <Feature />
            <Pricing />
          </Layout>
        </>
      );
}