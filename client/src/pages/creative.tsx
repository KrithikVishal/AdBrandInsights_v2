import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, MousePointer, FlaskConical } from "lucide-react";

function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  colorClass 
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  colorClass: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{title}</h3>
          <Icon className={`w-5 h-5 ${colorClass}`} />
        </div>
        <p className="text-lg font-bold mb-2">{value}</p>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function CreativeCard({ 
  title, 
  imageUrl, 
  ctr, 
  cvr, 
  impressions 
}: {
  title: string;
  imageUrl: string;
  ctr: string;
  cvr: string;
  impressions: string;
}) {
  return (
    <Card className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-muted flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = '<div class="text-muted-foreground text-sm">Image placeholder</div>';
          }}
        />
      </div>
      
      <CardContent className="p-4">
        <h4 className="font-semibold text-sm mb-2">{title}</h4>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>CTR:</span>
            <span className="font-medium text-green-600">{ctr}</span>
          </div>
          <div className="flex justify-between">
            <span>CVR:</span>
            <span className="font-medium text-blue-600">{cvr}</span>
          </div>
          <div className="flex justify-between">
            <span>Impressions:</span>
            <span className="font-medium">{impressions}</span>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-3">
          <Button className="flex-1" size="sm">
            Analyze
          </Button>
          <Button variant="outline" className="flex-1" size="sm">
            A/B Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TestRow({ 
  testName, 
  description, 
  variants, 
  split, 
  confidence, 
  winner 
}: {
  testName: string;
  description: string;
  variants: string;
  split: string;
  confidence: string;
  winner: string;
}) {
  return (
    <tr className="border-b border-border">
      <td className="p-4">
        <div>
          <p className="font-medium">{testName}</p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </td>
      <td className="p-4">{variants}</td>
      <td className="p-4">{split}</td>
      <td className="p-4">
        <Badge 
          variant="default"
          className="bg-green-100 text-green-800 hover:bg-green-100"
        >
          {confidence}
        </Badge>
      </td>
      <td className="p-4">{winner}</td>
      <td className="p-4">
        <Button variant="link" className="text-primary hover:text-primary/80 text-sm p-0">
          View Results
        </Button>
      </td>
    </tr>
  );
}

export default function Creative() {
  const creativeAssets = [
    {
      title: "Tech Workspace Ad",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      ctr: "4.8%",
      cvr: "8.2%",
      impressions: "45.2K"
    },
    {
      title: "Holiday Sale Banner",
      imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      ctr: "5.3%",
      cvr: "12.1%",
      impressions: "38.7K"
    },
    {
      title: "Product Showcase",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      ctr: "3.9%",
      cvr: "6.8%",
      impressions: "52.1K"
    },
    {
      title: "Brand Story Video",
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      ctr: "6.2%",
      cvr: "15.4%",
      impressions: "29.8K"
    }
  ];

  const abTests = [
    {
      testName: "Holiday CTA Test",
      description: "Testing button colors",
      variants: "2 variants",
      split: "50/50",
      confidence: "95%",
      winner: "Variant B"
    },
    {
      testName: "Headline Comparison",
      description: "Testing headline variations",
      variants: "3 variants",
      split: "33/33/34",
      confidence: "87%",
      winner: "Variant A"
    },
    {
      testName: "Image Style Test",
      description: "Lifestyle vs Product shots",
      variants: "2 variants",
      split: "50/50",
      confidence: "92%",
      winner: "Variant A"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Creative Performance</h2>
        <p className="text-muted-foreground">Analyze and optimize your ad creatives for maximum impact</p>
      </div>

      {/* Creative Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Top Performing Creative"
          value="Holiday Banner v3"
          subtitle="CTR: 5.8% | CVR: 12.4%"
          icon={Trophy}
          colorClass="text-yellow-600"
        />
        
        <MetricCard
          title="Avg. CTR"
          value="3.2%"
          subtitle="+0.4% vs last month"
          icon={MousePointer}
          colorClass="text-blue-600"
        />
        
        <MetricCard
          title="Active A/B Tests"
          value="8"
          subtitle="2 concluding soon"
          icon={FlaskConical}
          colorClass="text-green-600"
        />
      </div>

      {/* Creative Gallery */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Creative Assets</CardTitle>
            <div className="flex space-x-2">
              <Button variant="default" size="sm">All</Button>
              <Button variant="ghost" size="sm">Images</Button>
              <Button variant="ghost" size="sm">Videos</Button>
              <Button variant="ghost" size="sm">Carousels</Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {creativeAssets.map((asset, index) => (
              <CreativeCard
                key={index}
                title={asset.title}
                imageUrl={asset.imageUrl}
                ctr={asset.ctr}
                cvr={asset.cvr}
                impressions={asset.impressions}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* A/B Testing Section */}
      <Card>
        <CardHeader>
          <CardTitle>Active A/B Tests</CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold">Test Name</th>
                  <th className="text-left p-4 font-semibold">Variants</th>
                  <th className="text-left p-4 font-semibold">Traffic Split</th>
                  <th className="text-left p-4 font-semibold">Confidence</th>
                  <th className="text-left p-4 font-semibold">Winner</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {abTests.map((test, index) => (
                  <TestRow
                    key={index}
                    testName={test.testName}
                    description={test.description}
                    variants={test.variants}
                    split={test.split}
                    confidence={test.confidence}
                    winner={test.winner}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
