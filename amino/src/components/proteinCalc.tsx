"use client";

import { PlusCircle } from "lucide-react";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type {
  Naringsvarden,
  Livsmedelsida,
  Livsmedel,
} from "~/lib/models/livsmedel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useToast } from "~/components/ui/use-toast";
import { useState } from "react";

export const ProteinCalc: React.FC = () => {
  const [calculatedValue, setCalculatedValue] = useState<number>(0);

  const formSchema = z.object({
    kcal: z.coerce
      .number({
        required_error: "Calories is required",
        invalid_type_error: "Calories must be a number",
      })
      .int()
      .positive()
      .min(1, { message: "Calories should be at least 1" }),
    protein: z.coerce
      .number({
        required_error: "Protein is required",
        invalid_type_error: "Protein must be a number",
      })
      .int()
      .positive()
      .min(1, { message: "Protein should be at least 1" }),
  });

  const { handleSubmit, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kcal: 0,
      protein: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const calculatedValue = (values.kcal / values.protein).toFixed(2);
    setCalculatedValue(Number(calculatedValue));
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Protein per kcal-kalkylator</CardTitle>
            <CardDescription>
              Räknar ut hur många kalorier ett livsmedel innehåller per gram
              protein. Ju lägre desto bättre.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Livsmedel</TableHead>
                  <TableHead>Kcal</TableHead>
                  <TableHead>Protein</TableHead>
                  <TableHead>Kcal/gram protein</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Label htmlFor="livsmedel-1" className="sr-only">
                      Livsmedel
                    </Label>
                    <Input id="livsmedel-1" type="text" defaultValue="" />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="kcal"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Kcal"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="protein"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Protein"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="kcalprotein-1" className="sr-only">
                      Kcal/Protein
                    </Label>
                    {calculatedValue}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex-col justify-center border-t p-4">
            <Button size="sm" variant="ghost" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Lägg till livsmedel
            </Button>
            <Button className="" type="submit">
              Räkna ut
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
