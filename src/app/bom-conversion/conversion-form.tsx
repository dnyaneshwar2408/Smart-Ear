"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UploadCloud, FileText, List, AlertTriangle } from "lucide-react";
import { performEBOMConversion, performComponentIdentification } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ebomSchema = z.object({
  ebomFile: z.any().refine(file => file?.length == 1, "eBOM file is required."),
  ebomText: z.string().optional(),
});

const mbomSchema = z.object({
  cadFile: z.any().refine(file => file?.length == 1, "CAD file is required."),
});

type EBOMFormData = z.infer<typeof ebomSchema>;
type MBOMFormData = z.infer<typeof mbomSchema>;

const fileToDataURI = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function ConversionForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [ebomDataUri, setEbomDataUri] = useState<string>('');
  const [ebomText, setEbomText] = useState<string>('');
  const [generatedMBOM, setGeneratedMBOM] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<{
    missingComponents: string[];
    incompleteInformation: string[];
  } | null>(null);


  const ebomMethods = useForm<EBOMFormData>({ resolver: zodResolver(ebomSchema) });
  const mbomMethods = useForm<MBOMFormData>({ resolver: zodResolver(mbomSchema) });

  const handleEbomSubmit = async (data: EBOMFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const file = data.ebomFile[0];
      const dataUri = await fileToDataURI(file);
      setEbomDataUri(dataUri);

      const text = await file.text();
      setEbomText(text);

      const result = await performEBOMConversion({ ebomDataUri: dataUri });
      setGeneratedMBOM(result.mbom);
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    }
    setIsLoading(false);
  };

  const handleMbomSubmit = async (data: MBOMFormData) => {
    setIsLoading(true);
    setError(null);
    try {
        const file = data.cadFile[0];
        const cadDataUri = await fileToDataURI(file);
        
        const result = await performComponentIdentification({
            ebom: ebomText,
            mbom: generatedMBOM,
            cadDrawing: cadDataUri,
        });
        setAnalysisResult(result);
        setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    setStep(1);
    setIsLoading(false);
    setError(null);
    setGeneratedMBOM("");
    setAnalysisResult(null);
    setEbomDataUri('');
    setEbomText('');
    ebomMethods.reset();
    mbomMethods.reset();
  }

  return (
    <div className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {step === 1 && (
        <FormProvider {...ebomMethods}>
          <form onSubmit={ebomMethods.handleSubmit(handleEbomSubmit)} className="space-y-4">
            <h3 className="text-xl font-semibold">Step 1: Generate Manufacturing BOM (mBOM)</h3>
            <p className="text-muted-foreground">Upload an Engineering BOM (eBOM) file. The AI will analyze it and generate an mBOM with necessary assembly details.</p>
            <div className="space-y-2">
              <Label htmlFor="ebomFile">eBOM File (text or CAD)</Label>
              <div className="flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-muted-foreground" />
                <Input id="ebomFile" type="file" {...ebomMethods.register("ebomFile")} />
              </div>
              {ebomMethods.formState.errors.ebomFile && (
                <p className="text-sm text-destructive">{ebomMethods.formState.errors.ebomFile.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate mBOM
            </Button>
          </form>
        </FormProvider>
      )}

      {step >= 2 && (
        <div>
            <h3 className="text-xl font-semibold">Step 2: Review Generated mBOM</h3>
            <p className="text-muted-foreground mb-4">The following mBOM was generated from your eBOM. Review the details below.</p>
            <div className="space-y-4">
                <Label htmlFor="generatedMBOM">Generated mBOM</Label>
                <Textarea id="generatedMBOM" value={generatedMBOM} readOnly rows={15} className="font-mono bg-muted/50" />
            </div>
        </div>
      )}

      {step === 2 && (
         <FormProvider {...mbomMethods}>
          <form onSubmit={mbomMethods.handleSubmit(handleMbomSubmit)} className="space-y-4 pt-4">
            <Separator className="my-4"/>
            <h3 className="text-xl font-semibold">Step 3: Identify Missing Components</h3>
            <p className="text-muted-foreground">Upload the corresponding CAD drawing to identify any missing or incomplete information in the generated mBOM.</p>
             <div className="space-y-2">
              <Label htmlFor="cadFile">CAD Drawing</Label>
              <div className="flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-muted-foreground" />
                <Input id="cadFile" type="file" {...mbomMethods.register("cadFile")} />
              </div>
              {mbomMethods.formState.errors.cadFile && (
                <p className="text-sm text-destructive">{mbomMethods.formState.errors.cadFile.message}</p>
              )}
            </div>
            <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze for Missing Components
                </Button>
                <Button variant="outline" onClick={handleReset}>Start Over</Button>
            </div>
          </form>
        </FormProvider>
      )}

      {step === 3 && analysisResult && (
        <div className="pt-4">
          <Separator className="my-4"/>
          <h3 className="text-xl font-semibold mb-4">Step 4: Analysis Complete</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><List className="h-5 w-5 text-primary"/>Missing Components</CardTitle>
                </CardHeader>
                <CardContent>
                    {analysisResult.missingComponents.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                            {analysisResult.missingComponents.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground">No missing components found.</p>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-amber-600"/>Incomplete Information</CardTitle>
                </CardHeader>
                <CardContent>
                    {analysisResult.incompleteInformation.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                            {analysisResult.incompleteInformation.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground">No incomplete information found.</p>
                    )}
                </CardContent>
            </Card>
          </div>
          <Button onClick={handleReset} className="mt-6">Start New Conversion</Button>
        </div>
      )}
    </div>
  );
}
